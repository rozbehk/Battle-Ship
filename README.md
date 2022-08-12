Battleship
==========

The game
--------

Long version: [see wikipedia](https://secure.wikimedia.org/wikipedia/en/wiki/Battleship_game)

* Each player starts with a fleet of 5 ships, of length 5, 4, 3, 3, and 2.
* Each player places their ships horizontally or vertically on a 10x10 grid;
  this is not visible to their opponent.
* Players take turns to fire at positions on the grid, gradually revealing
  where their opponent’s ships are and are not located.
* A ship is destroyed when every cell of a ship has been hit.
* The winner is the first player to destroy their opponent’s fleet.

You lose if:

* You do not place the correct number and size of ships.
* You place your fleet in impossible positions (ships overlapping or partly off
  the board).
* Your code raises an exception.
* All your ships have been sunk.

TECHNOLOGIES
--------------
* HTML
* Javascript
* CSS



HOW TO PLAY
--------------

Will Add soon

`state` is a representation of the known state of the opponent’s fleet, as
modified by the player’s shots. It is given as an array of arrays; the inner
arrays represent horizontal rows. Each cell may be in one of three states:
`:unknown`, `:hit`, or `:miss`. E.g.

    [[:hit, :miss, :unknown, ...], [:unknown, :unknown, :unknown, ...], ...]
    # 0,0   1,0    2,0              0,1       1,1       2,1

`ships_remaining` is an array of the ships remaining on the opponent's board,
given as an array of numbers representing their lengths, longest first.
For example, the first two calls will always be:

    [5, 4, 3, 3, 2]

If the player is lucky enough to take out the length 2 ship on their first two
turns, the third turn will be called with:

    [5, 4, 3, 3]

and so on.

`take_turn` must return an array of co-ordinates for the next shot. In the
example above, we can see that the player has already played `[0,0]`, yielding
a hit, and `[1,0]`, giving a miss. They can now return a reasonable guess of
`[0,1]` for their next shot.

The console runner
------------------

A console runner is provided. It can be started using:

    bundle exec bin/play path/to/player_a.rb path/to/player_b.rb

Players are isolated using DRb.

A couple of very basic players are supplied: `NaivePlayer` and
`AnotherNaivePlayer` put all their ships in a corner and guess at random (often
wasting turns by repeating themselves).  `HumanPlayer` asks for input via the
console.
