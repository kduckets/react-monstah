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
 var division = {
     position:'absolute',
     borderSpacing: '0px',
     border: '1px solid #ccc',
     width:'20%'
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
    //  background: '#e5e5e5',
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
 var heading = {
   textAlign: 'center',
 }
 var standingsBox = {
    width:'20%'
 }
 var boxScoreDiv ={
   paddingLeft: '25%',
   paddingRight:'30%'
 }

var TeamSummary = React.createClass({
    render: function() {

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
        // console.log(game);
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

var Standings = React.createClass({

  contextTypes: {
      router: React.PropTypes.func
  },

 render: function (){
   var standings = this.props.standings;
   return (
  <div></div>
   );
 }
});

var StandingsList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
    var standings = this.props.standings;
      if (standings !== null) {
        var standingsList = standings.standing.map(function(d, idx){
          if(d.conference === 'AL' && d.division ==='E'){
            //show 1/2 for games back instead of .5
            var gamesBack = parseInt(d.games_back);
            if(gamesBack != d.games_back){
              var half = '1/2';
            }
            if(gamesBack === 0){
              gamesBack = '-';
            }
            return (<tr><td style={count} key={idx}>{d.first_name.toUpperCase()}</td>
                <td style={count}>{d.won}</td>
                <td style={count}>{d.lost}</td>
                <td style={count}>{gamesBack}</td>
                {half ? <td style={count}><sup>1</sup>/<sub>2</sub></td> : <td style={count}></td>}
              </tr>)
          }
      })
        }
        return (
          <div style={standingsBox}>
           <p style={heading}>AL EAST</p>
            <table style={division}>
            <th></th>
            <th>W</th>
            <th>L</th>
            <th>GB</th>
            <tbody> {standingsList}</tbody></table>
          </div>
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
        return {scoreboard: null, standings:null};
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
        this.loadScores();
        setInterval(this.loadScores, 10000);
        $.ajax({
            url: '/standings',
            dataType: 'json',
            success: function(data) {
                this.setState({standings: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadScores: function(){
      var year = this.props.date.getFullYear();
      var month = this.props.date.getMonth() + 1;
      var day = this.props.date.getDate();
      var soxGid = null;
      $.ajax({
          url: '/scoreboard/' + year + '/' + month + '/' + day,
          dataType: 'json',
          success: function(data) {
              var data = this.cleanData(data);
              this.setState({scoreboard: data});
              data.game.map(function(game) {
                  if(game.away_name_abbrev === 'BOS' || game.home_name_abbrev === 'BOS'){
                   soxGid = game.gameday;
                }
              });
              this.loadSoxGame(soxGid);
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    },
    loadSoxGame: function(gid){
      $.ajax({
          url: '/boxscore/gid_' + gid,
          dataType: 'json',
          success: function(data) {
              this.setState({soxboard: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    },

    render: function() {
        var scoreboard = this.state.scoreboard;
        var standings = this.state.standings;
        var soxboard = this.state.soxboard;

        if(soxboard){
        var boxscore = soxboard.data.boxscore;
        var linescore = boxscore.linescore;
        console.log(soxboard, linescore);
        return (
            <div>
                <StandingsList standings={standings}/>
                <GameListNL scoreboard={scoreboard} />
                <GameListAL scoreboard={scoreboard} />
                <LineScore home={boxscore.home_team_code.toUpperCase()}
                away={boxscore.away_team_code.toUpperCase()} linescore={linescore.inning_line_score} />
            </div>
        );
      }else{
        return(
        <div>
            <StandingsList standings={standings}/>
            <GameListNL scoreboard={scoreboard} />
            <GameListAL scoreboard={scoreboard} />
        </div>
      );
      }
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
    padding: '2px',
    textAlign: 'center'
}

var inningTableStyle = {
    borderSpacing: '0px',
    position: 'absolute',
    width:'40%'
}

/* This entire section doesn't feel quite right - very verbose.
 * I think I'm likely doing something wrong right now here */
var HeaderCell = React.createClass({
    render: function() {
    return (<th style={headerCellStyle}>{this.props.inning.inning}</th>); }
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
//this.props.innings.map
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
        console.log(linescore);
        if(linescore.length < 9){
          for (var i = linescore.length + 1; i < 10; i+=1) {
            linescore.push({home:'', away:'', inning:i});
          }
        }
        var heading = (<HeaderRow innings={linescore} />);

        return (
            <div style={boxScoreDiv}>
            <p style={heading}>FENWAY PARK</p>
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
