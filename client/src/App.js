import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080,
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(2),
    },
    tableHead: {
        fontSize: '1.0rem',
    },
    progress: {
        margin: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
            completed: 0,
            searchKeyword: '',
        };
    }

    stateRefresh = () => {
        console.log('gg');
        this.setState({
            customers: '',
            completed: 0,
            searchKeyword: '',
        });
        console.log('g1');

        this.callApi()
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].gender === '1') {
                        res[i].gender = '남자';
                    } else {
                        res[i].gender = '여자';
                    }
                }

                this.setState({ customers: res });
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].gender === '1') {
                        res[i].gender = '남자';
                    } else {
                        res[i].gender = '여자';
                    }
                }

                this.setState({ customers: res });
            })
            .catch(err => {
                console.log(err);
            });
    }

    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    };

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    handleValueChange = evn => {
        let nextState = {};
        nextState[evn.target.name] = evn.target.value;
        this.setState(nextState);
    };

    render() {
        const filteredComponents = data => {
            data = data.filter(customer => {
                return customer.name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map(customer => {
                return (
                    <Customer
                        stateRefresh={this.stateRefresh}
                        key={customer.id}
                        id={customer.id}
                        image={customer.image}
                        name={customer.name}
                        birthday={customer.birthday}
                        gender={customer.gender}
                        job={customer.job}></Customer>
                );
            });
        };
        const { classes } = this.props;
        const cellList = ['번호', '프로필이미지', '이름', '생년월일', '성별', '직업', '설정'];
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            고객관리 시스템
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="검색하기"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
                </div>
                <Paper>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {cellList.map(cell => {
                                    return <TableCell className={classes.tableHead}>{cell}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.customers ? (
                                filteredComponents(this.state.customers)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6" align="center">
                                        <CircularProgress
                                            className={classes.progress}
                                            variant="determinate"
                                            value={this.state.completed}></CircularProgress>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);
