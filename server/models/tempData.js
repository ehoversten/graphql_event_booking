const users = [
    {
        _id: '1',
        username: "bingo",
        email: 'bingo@gmail.com',
        password: 'pass1234'
    },
    {
        _id: '2',
        username: "chicken",
        email: 'chicken@gmail.com',
        password: 'pass1234'
    },
    {
        _id: '3',
        username: "mario",
        email: 'mario@gmail.com',
        password: 'pass1234'
    },
];

const events = [
    {
        _id: '1',
        title: 'Concert',
        description: 'The Black Pumas',
        price: '75',
        date: '06/25/2024'
    },
    {
        _id: '2',
        title: 'Concert',
        description: 'The Black Pumas',
        price: '75',
        date: '06/25/2024'
    },
    {
        _id: '3',
        title: 'Play',
        description: 'Wizard of Oz',
        price: '125',
        date: '07/20/2024'
    },
    {
        _id: '4',
        title: 'Dr. Appt',
        description: 'General Checkup',
        price: '25',
        date: '05/15/2024'
    },
    {
        _id: '5',
        title: 'Article Due',
        description: 'New React Article',
        price: null,
        date: '04/30/2024'
    },
]


module.exports = { users, events };