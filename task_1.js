const myXML = `
<list>
  <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
  </student>
  <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(myXML, "text/xml");
const objs = [];
const objWrap = {
    list: {}
};

const students = xmlDOM.querySelectorAll("student");

for (let i=0; i<students.length; i++) {
    let obj = {
      name: students[i].querySelector("first").textContent + " " + students[i].querySelector("second").textContent,
      age: +students[i].querySelector("age").textContent,
      prof: students[i].querySelector("prof").textContent
    }
    objs.push(obj);
}

objWrap.list = objs;

console.log(objWrap);


