const myJSON = `
{
    "list": [
        {
            "name": "Petr",
            "age": "20",
            "prof": "mechanic"
        },
        {
            "name": "Vova",
            "age": "60",
            "prof": "pilot"
        }
    ]
}
`;

const objWrap = {
    list: {}
};

const objs = [];

const list = JSON.parse(myJSON);

for (key in list.list) {
    let obj = {
        name: list.list[key].name,
        age: +list.list[key].age,
        prof: list.list[key].prof
    }
    objs.push(obj);
}

objWrap.list = objs

console.log(objWrap);


