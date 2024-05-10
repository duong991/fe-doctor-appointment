export const usersData = [
    {
        id: '1',
        name: 'Carolyn Perkins',
        email: 'eileen_h@hotmail.com',
        img: '/img/avatars/thumb-1.jpg',
    },
]

export const userDetailData = [
    {
        id: '05cade3c-c46e-4134-967c-e5afadb0169c',
        name: 'Carolyn Perkins',
        email: 'carolyn_h@hotmail.com',
        img: '/img/avatars/thumb-1.jpg',
        role: 'Patient',
        lastOnline: 1623430400,
        smartCardStatus: 'active',
        // personalInfo: {
        address: 'New York, US',
        title: 'Product Manager',
        dob: '10/10/1992',
        phone: '+12-123-1234',
        facebook: 'facebook.com/sample',
        twitter: 'twitter.com/sample',
        pinterest: 'pinterest.com/sample',
        linkedIn: 'linkedin/sample',
        // },
        favoriteDoctor: [
            {
                id: '#36223',
                name: 'Mock premium pack',
                specialist: 'pending',
                amount: 39.9,
                rating: 5,
            },
            {
                id: '#34283',
                name: 'Business board pro subscription',
                specialist: 'paid',
                amount: 59.9,
                rating: 5,
            },
            {
                id: '#32234',
                name: 'Business board pro subscription',
                specialist: 'paid',
                amount: 59.9,
                rating: 5,
            },
            {
                id: '#31354',
                name: 'Business board pro subscription',
                specialist: 'paid',
                amount: 59.9,
                rating: 5,
            },
        ],
        paymentHistory: [
            {
                id: '#36223',
                item: 'Mock premium pack',
                status: 'pending',
                amount: 39.9,
                date: 1639132800,
            },
            {
                id: '#34283',
                item: 'Business board pro subscription',
                status: 'paid',
                amount: 59.9,
                date: 1636790880,
            },
            {
                id: '#32234',
                item: 'Business board pro subscription',
                status: 'paid',
                amount: 59.9,
                date: 1634090880,
            },
            {
                id: '#31354',
                item: 'Business board pro subscription',
                status: 'paid',
                amount: 59.9,
                date: 1631532800,
            },
        ],
        paymentMethod: [
            {
                id: '1',
                cardName: 'Carolyn Perkins',
                cardType: 'VISA',
                expMonth: '12',
                expYear: '25',
                last4Number: '',
                primary: true,
                isBlocked: true,
                balance: 0,
            },
        ],
        subscription: [
            {
                plan: 'Business board pro',
                status: 'active',
                billing: 'monthly',
                nextPaymentDate: 1639132800,
                amount: 59.9,
            },
        ],
    },
]
