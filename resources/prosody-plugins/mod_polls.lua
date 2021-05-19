local json = require("util.json");
local st = require("util.stanza");

local util = module:require("util");
local muc = module:depends("muc");

local is_healthcheck_room = util.is_healthcheck_room;

local function get_poll_message(stanza)
	if stanza.attr.type ~= "groupchat" then
		return nil;
	end
	local json_data = stanza:get_child_text("json-message", "http://jitsi.org/jitmeet");
	if json_data == nil then
		return nil;
	end
	local data = json.decode(json_data);
	if data.type ~= "new-poll" and data.type ~= "answer-poll" then
		return nil;
	end
	return data;
end

local function check_polls(room)
	if room.polls == nil then
		module:log("warn", "no polls data in room");
		return true;
	end
	return false;
end

module:hook("muc-room-created", function(event)
	local room = event.room;
	if is_healthcheck_room(room.jid) then return end
	module:log("debug", "setting up polls in room "..tostring(room));
	room.polls = {};
end);

module:hook("message/bare", function(event)
	local data = get_poll_message(event.stanza);
	if data == nil then return end

	local room = muc.get_room_from_jid(event.stanza.attr.to);

	if data.type == "new-poll" then
		if check_polls(room) then return end

		local answers = {}
		for _, name in ipairs(data.answers) do
			table.insert(answers, { name = name, voters = {} });
		end

		room.polls[data.pollId] = {
			sender_id = data.senderId,
			question = data.question,
			answers = answers
		};

	elseif data.type == "answer-poll" then
		if check_polls(room) then return end

		local poll = room.polls[data.pollId];
		if poll == nil then
			module:log("warn", "answering inexistent poll");
			return;
		end

		for i, value in ipairs(data.answers) do
			if value then
				poll.answers[i].voters[data.senderId] = data.voterName;
			end
		end
	end
end);

module:hook("muc-occupant-joined", function(event)
	local room = event.room;
	if is_healthcheck_room(room.jid) then return end
	if check_polls(room) then return end

	local data = {
		type = "old-polls",
		polls = {}
	};
	for poll_id, poll in pairs(room.polls) do
		data.polls[tostring(poll_id)] = {
			senderId = poll.sender_id,
			question = poll.question,
			answers = poll.answers
		};
	end

	local stanza = st.message({
		from = room.jid,
		to = event.occupant.jid
	})
	:tag("json-message", { xmlns = "http://jitsi.org/jitmeet" })
	:text(json.encode(data))
	:up();

	room:route_stanza(stanza);
end);
