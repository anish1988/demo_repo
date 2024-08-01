//const jsonfile = require('jsonfile');
//const moment = require('moment');
//const simpleGit = require('simple-git');
import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';
const FILENAME = './data.json';

const makeComment = n => {
    if(n===0) return
    const x =random.int(0, 54);
    const y =random.int(0, 6);
    const DATE =    moment().subtract(4, 'y').add(1, 'd')
        .add(x, 'w').add(y, 'd').format();
    const data = {
        date: DATE
    }
    console.log(DATE);

jsonfile.writeFile(FILENAME, data, () => {
    simpleGit().add([FILENAME]).commit(DATE, {
        '--date': DATE},
        makeComment.bind(this, --n)).push();

});


}
makeComment(500);

