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
        id: '1',
        name: 'Carolyn Perkins',
        email: 'carolyn_h@hotmail.com',
        img: '/img/avatars/thumb-1.jpg',
        role: 'Patient',
        lastOnline: 1623430400,
        smartCardStatus: 'active',
        personalInfo: {
            location: 'New York, US',
            title: 'Product Manager',
            birthday: '10/10/1992',
            phoneNumber: '+12-123-1234',
            facebook: 'facebook.com/sample',
            twitter: 'twitter.com/sample',
            pinterest: 'pinterest.com/sample',
            linkedIn: 'linkedin/sample',
        },
        orderHistory: [
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
                cardHolderName: 'Smart Card',
                cardType: 'VISA',
                expMonth: '12',
                expYear: '25',
                last4Number: '',
                primary: true,
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
