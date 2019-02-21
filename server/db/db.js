const users = [
    {
        firstname: 'admin',
        lastname: 'admin',
        othername: '',
        email: 'admin@politico.com',
        phoneNumber: '080123456789',
        isAdmin: true
    },
    {
        firstname: 'Max',
        lastname: 'Pen',
        othername: '',
        email: 'max@politico.com',
        phoneNumber: '080123456789',
        isAdmin: false
    },
    {
        firstname: 'Mack',
        lastname: 'Pearson',
        othername: '',
        email: 'mack@politico.com',
        phoneNumber: '080123456789',
        isAdmin: false
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
]

export {parties, offices};
