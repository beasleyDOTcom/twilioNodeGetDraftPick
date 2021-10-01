# twilioNodeGetDraftPick
This service should allow a host to turn on the service, allowing participants to text a password to the service and receive a draft pick once the host sends his password to close signups.

# sign up via text
ok so this service should allow a host to open a room that users may enter by texting the room code to the service.
Once the host closes the room:
- [x] The participants in the room will get shuffled in place
- [ ] The participants will be inserted into the Queue
- [ ] While size of queue is greater than 0, Dequeue paricipant
- [ ] send them a text with brief instructions and a list of open time slots with a number next to them like this: 1) 8:00 2) 8:10 etc. asking the user to return the number of the slot for which they'd like to sign up.
- [ ] wait 1 minute for user to respond
- [ ] if user does not respond, enqueue user and update their number of tries to 1. (they can try again after everyone else has signed up)(if user has already tried, and doesn't respond again--feed them to the garbage collector)
- [ ] if user does respond with a number that does not correspond to an available time slot or NaN send an error message.
- [ ] if user does respond with a number that does correspond with an available time slot, assign their name and number to that time slot. 
- [ ] Once the queue has a size of 0:
- [ ] Send host a message with everyone's name next to their time slot. 



# let's talk permissions
- [ ] hosts can't see everyone's phone numbers -- no one should get stalked because they signed up for open mic.
- [ ] hosts can send participants of open mic one of several predetermined messages related to open mic.
- [ ] participants can quit open mic once they respond to a confirmation text that they'd not like to participate.
- [ ] participants can request that they not be texted about the open mic (for example, someone get's drunk and takes someone elses guitar home with them on accident. The host can choose to send the participant a text saying "you've forgotten something at open mic")


# codebase structure
I'm going to clean up the main page by importing most of the functions