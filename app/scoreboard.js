var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    Link = Router.Link;

/*css*/

 var boxScore = {
     margin: '10px',
     borderSpacing: '0px',
     border: '1px solid #ccc',
 }
 var status = {
     fontSize: '13px',
     rowspan: '2'
 }
 var runs = {
     fontWeight: 'bold',
     borderLeft: '1px solid #ccc'
 }
 var count = {
     fontWeight: 'normal',
     color: '#999'
 }
 var flexbox = {
     display: 'flex',
     flexWrap: 'wrap',
     flexFlow: 'row wrap'
 }
 var selectedBoxscore = {
     borderWidth: '5px'
 }

var TeamSummary = React.createClass({
    render: function() {
        var style = {
            width: '65px',
            height: '36px',
            paddingLeft: '38px',
            marginLeft: '4px',
            verticalAlign: 'middle',
            display: 'table-cell',
            textAlign: 'left'
        }
        var record = {
            fontSize: '11px',
            fontWeight: 'normal',
            color: '#999',
            lineHeight: '13px'
        }
        var abbr = {
            fontSize: '13px',
            fontWeight: 'bold',
            lineHeight: '15px'
        }
        var runs = {
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '30px',
            height: '38px',
            background: '#e5e5e5',
            borderTop: '1px solid #ccc',
            borderLeft: '1px solid #ccc'
        }
        var count = {
            fontSize: '13px',
            textAlign: 'center',
            width: '30px',
            height: '38px',
            borderTop: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
        }
        var team = {
            borderTop: '1px solid #ccc'
        }
        return (
            <tr>
            <th style={team}>
                <div style={style}>
                    <abbr style={abbr}>{this.props.abbr.toUpperCase()}</abbr><br/>
                </div>
            </th>
            {this.props.inning && <td rowSpan={2} style={count}>{this.props.inning}</td>}
            <td style={runs}>{this.props.runs}</td>
            </tr>
        );
    }
});

/* This component renders a Game Card. Each Game Card is a summary of a game
 * that contains TeamSummary components for the home and away team, as well as a
 * summary of the Runs, Hits and Errors for that game */
 var GameCardAL = React.createClass({
     contextTypes: {
         router: React.PropTypes.func
     },
     render: function() {

         var game = this.props.game;

         return (
             /* Note here that I am passing home_name_abbrev and
              * away_name_abbrev because I don't know how to access the
              * master component's state. I think this should be possible
              * so TODO: figure out how to do this */
             game.home_league_id === '103' &&
             <Link to='game' activeStyle={selectedBoxscore} params={{ gid: game.gameday, home: game.home_name_abbrev, away: game.away_name_abbrev }}>
             <table style={boxScore}>
             <tbody>
                 <TeamSummary
                     code={game.away_code}
                     abbr={game.away_name_abbrev}
                     runs={game.linescore.r.away}
                     inning={game.status.inning && game.status.status != 'Pre-Game' ? game.status.inning : ' '}
                     />
                 <TeamSummary
                     code={game.home_code}
                     abbr={game.home_name_abbrev}
                     runs={game.linescore.r.home}
                     />
             </tbody></table>
             </Link>
         );

     }
 });

 /* This component renders a Flexbox that contains a list of AL GameCards. */

 var GameListAL = React.createClass({
     contextTypes: {
         router: React.PropTypes.func
     },
     render: function() {
         var flexbox = {
           flexDirection:'column',
           justifyContent: 'space-between',
           float: 'right'
         }
         var scoreboard = this.props.scoreboard;
         var gameListAL = ( <tr /> );
         if (scoreboard !== null) {
             gameListAL = scoreboard.game.map(function(game) {
                 return (<GameCardAL game={game} />)
             });
         }
         return (
             <div style={flexbox}> {gameListAL} </div>
         );
     }
 });

var GameCardNL = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {

        var game = this.props.game;
        console.log(game);
        return (
            game.home_league_id === '104' &&
            <Link to='game' activeStyle={selectedBoxscore} params={{ gid: game.gameday, home: game.home_name_abbrev, away: game.away_name_abbrev }}>
            <table style={boxScore}>
            <tbody>
                <TeamSummary
                    code={game.away_code}
                    abbr={game.away_name_abbrev}
                    runs={game.linescore.r.away}
                    inning={game.status.inning && game.status.status != 'Pre-Game' ? game.status.inning : ' '}
                    />
                <TeamSummary
                    code={game.home_code}
                    abbr={game.home_name_abbrev}
                    runs={game.linescore.r.home}
                    />
            </tbody></table>
            </Link>
        );

    }
});

/* This component renders a Flexbox that contains a list of NL GameCards. */

var GameListNL = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var flexbox = {
          flexDirection:'column',
          justifyContent: 'space-between',
          float: 'right'
        }
        var scoreboard = this.props.scoreboard;
        var gameListNL = ( <tr /> );
        if (scoreboard !== null) {
            gameListNL = scoreboard.game.map(function(game) {
                return (<GameCardNL game={game} />)
            });
        }
        return (
            <div style={flexbox}> {gameListNL} </div>
        );
    }
});

/* React component that represents the scoreboard card-based view. Clicking on a
 * card on the scoreboard will trigger an action to display details about the
 * selected card. */

var Scoreboard = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {scoreboard: null};
    },

    /* Clean the data that comes back from the site */

    cleanData: function(scoreboard) {
        // Walk games
        scoreboard.game.map(function(game) {
            if (game.linescore === undefined) {
                game.linescore = {
                    h: {
                        home: 0,
                        away: 0
                    },
                    r: {
                        home: 0,
                        away: 0
                    },
                    e: {
                        home: 0,
                        away: 0
                    }
                }
            }
        });
        return scoreboard;
    },

    componentDidMount: function() {
        var year = this.props.date.getFullYear();
        var month = this.props.date.getMonth() + 1;
        var day = this.props.date.getDate();
        $.ajax({
            url: 'http://localhost:3000/scoreboard/' + year + '/' + month + '/' + day,
            dataType: 'json',
            success: function(data) {
                var data = this.cleanData(data);
                this.setState({scoreboard: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        var scoreboard = this.state.scoreboard;
        var games = (scoreboard === null) ? 'no' : scoreboard.game.length;
        return (
            <div>
                <GameListNL scoreboard={scoreboard} />
                <GameListAL scoreboard={scoreboard} />
            </div>
        );
    }
});

var today = new Date();

/* App holds master and detail */
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Scoreboard date={today} />
                <Game />
            </div>
        )
    }
});

/* Index contains the master */
var Index = React.createClass({
    render: function() {
        return (
            <Scoreboard date={today} />
        );
    }
});

var inningCellStyle = {
    border: '1px solid #d7d7d7',
    width: '1.4em',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '6px'
}

var headerCellStyle = {
    fontSize: '10px',
    fontWeight: 'normal',
    color: '#666',
    padding: '2px',
    textAlign: 'center'
}

var inningTableStyle = {
    borderSpacing: '0px',
    width:'50%'
}

/* This entire section doesn't feel quite right - very verbose.
 * I think I'm likely doing something wrong right now here */
var HeaderCell = React.createClass({
    render: function() { return (<th style={headerCellStyle}>{this.props.inning.inning}</th>); }
});

var HomeCell = React.createClass({
    render: function() { return (<td style={inningCellStyle}>{this.props.inning.home}</td>); }
});

var AwayCell = React.createClass({
    render: function() { return (<td style={inningCellStyle}>{this.props.inning.away}</td>); }
});

var HeaderRow = React.createClass({
    render: function() {
        return (
        <tr>
            <th></th>
            {this.props.innings.map(function(inning) {
                return (<HeaderCell inning={inning} />)
            })}
        </tr>);
    }
});

var HomeRow = React.createClass({
    render: function() {
        return (
        <tr>
            <td style={inningCellStyle}>{this.props.team}</td>
            {this.props.innings.map(function(inning) {
                return (<HomeCell inning={inning} />)
            })}
        </tr>);
    }
});

var AwayRow = React.createClass({
    render: function() {
        return (
        <tr>
            <td style={inningCellStyle}>{this.props.team}</td>
            {this.props.innings.map(function(inning) {
                return (<AwayCell inning={inning} />)
            })}
        </tr>);
    }
});

/* Game contains a LineScore component */
var LineScore = React.createClass({
    render: function() {
        var linescore = this.props.linescore;
        var heading = (<HeaderRow innings={linescore} />);

        return (
            <div>
            <table style={inningTableStyle}>
            <thead>
                <HeaderRow innings={linescore} />
            </thead>
            <tbody>
                <AwayRow team={this.props.away} innings={linescore} />
                <HomeRow team={this.props.home} innings={linescore} />
            </tbody>
            </table>
            </div>
        )
    }
});

/* Game contains the detail */
var Game = React.createClass({
    /* Interestingly enough, if you omit this method, there is no state property */
    getInitialState: function() {
        return {scoreboard: null};
    },

    contextTypes: {
        router: React.PropTypes.func
    },
    /* This method is invoked via a route */
    componentWillReceiveProps: function() {
        var gid = this.context.router.getCurrentParams().gid;
        $.ajax({
            url: '/boxscore/gid_' + gid,
            dataType: 'json',
            success: function(data) {
                this.setState({scoreboard: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: '/standings',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                this.setState({standings: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var scoreboard = this.state.scoreboard;
        var home = this.context.router.getCurrentParams().home;
        var away = this.context.router.getCurrentParams().away;
        if (scoreboard !== null && scoreboard.data !== null) {
            var boxscore = scoreboard.data.boxscore;
            var linescore = boxscore.linescore;
            return (
                <div>
                    <LineScore home={home} away={away} linescore={linescore.inning_line_score} />
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
});

/* Defining the routes available to the UI */
var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name='game' path='game/:gid/:away/:home' handler={Game}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});

/* Export the Index component */
module.exports = Index;
