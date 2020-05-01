## Database Structure
#### Prompts
Document ID: Auto generated
* prompt: String (A thing the players will come up with pair for)


#### Games
Document ID: 6 digit alphanumeric caps (This is the game code players will use to join)
* state: String (Describes the current state of a game. eg: WaitingForPlayers, Voting, etc)
* timeCreated: TimeStamp (At what time the game has been created)
* numRoundsPlayed: Number (Number of rounds played)
* prompts: Array
	* prompt: String (A set of unique prompts from the prompts collection)
* numPlayers: Number (Number of players in game)
	* host: String (device ID of host)
	* players: Array
		* player: Map
			* id: String (Device ID of player)
			* nickname: String (Displayed name of player)
			* score: Number (Total score of player)
			* votes: Number (Total votes recived by player)
			* answer: String (Player Response to prompt)
