//mikro task lada bizda promisla iwlatiladi 
//makro taskda time out 

console.log(1);

setTimeout(() => {
    console.log(2);
} , 1000)

console.log(3);

//callstack tugamaguncha callback functionlar caqirilmaydi 

function fetUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: 1, name: 'Alice' })
        }, 1000);
    });
}

function fetchOrders() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(["order1", "order2"])
        }, 1500);
    });
}

async function main() {
    console.log('...fetching data////');

    const user = await fetUsers();
    const orders = await fetchOrders();

    console.log('User:', user);
    console.log('Orders:', orders);
    console.log('malumot tugadi');
}

main();

console.log('Assalomu aleykum node');

