import bcrypt from "bcryptjs"

const users = [
    {
        firstname: 'admin',
        lastname: 'admin',
        othername: '',
        email: 'admin@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: true
    },
    {
        firstname: 'Max',
        lastname: 'Pen',
        othername: '',
        email: 'max@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: false
    },
    {
        firstname: 'Mack',
        lastname: 'Pearson',
        othername: '',
        email: 'mack@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: false
    },
    {
        firstname: 'Jack',
        lastname: 'Man',
        othername: '',
        email: 'jack@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: false
    },
    {
        firstname: 'Alli',
        lastname: 'Baba',
        othername: '',
        email: 'alli@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: false
    },
    {
        firstname: 'hamzah',
        lastname: 'abdulfattah',
        othername: '',
        email: 'hamzah@politico.com',
        password: bcrypt.hashSync('password'),
        phoneNumber: '080123456789',
        isAdmin: true
    }
]



const parties = [
    {
        name : "All progressive congress",
        hqAddress : "Wuse rd, Abuja",
        logoUrl : "http://apc.com/logo",
    },
    {
        name : "peoples democratic party",
        hqAddress : "Wuse rd, Abuja",
        logoUrl : "http://apc.com/logo",
    }
]

const offices = [
    {
        type: "Federal",
        name : "President"
    },
    {
        type: "State",
        name : "Governor"
    },
    {
        type: "Legislative",
        name : "Senator"
    }
]

const candidates = [
    {
        office: 1,
        party : 1,
        candidate: 2
    },
    {
        office: 1,
        party : 2,
        candidate: 3
    }
]

const votes = [
    {
        createdby: 2,
        office: 1,
        candidate: 1
    }
]

export {users, parties, offices, candidates, votes};
