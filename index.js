
"use strict";

const request = async () => {
  await fetch('data1.json', {method: 'GET'})
  .then(response => response.json() )
  .then(data => showData(data))
}

request();

const $table = document.getElementById('table');
const tableContents = document.createElement('table');
const tablebody= document.createElement('tbody');
const dialogEl = document.getElementById('dialog')
const filterEl = document.getElementsByClassName('selected')
const menuEl = document.querySelector('.menu')
const menuContent = document.querySelectorAll('.menu li')


$table.appendChild(tableContents);

let output = `
<thead id='header'>
<tr>
<th>name</th>
<th>title</th>
<th>email</th>
<th>role</th>
</tr>
</thead>
`;

tableContents.innerHTML = output;

let dataSorted = null;

function sortingDataDesc(data) {
  dataSorted = data.sort((a,b)=> {
    let nameA = a.name.split('name')[1];
    let nameB = b.name.split('name')[1];

    return nameB - nameA;
  })
  return dataSorted
}

function sortingDataAsc(data) {
  dataSorted = data.sort((a,b)=> {
    let nameA = a.name.split('name')[1];
    let nameB = b.name.split('name')[1];

    return nameA - nameB;
  })
  return dataSorted
}

function sortData (data, sorts) {
  switch(sorts){
    case 'desc':
      return sortingDataDesc(data)
      case 'asc':
      return sortingDataAsc(data)
      case 'Owner':
        return roleSortingOwner(data);
    case 'admin':
      return roleSortingAdmin(data);
  }
}

let filterCheck = false;


// function handleMenu() {
//   if(menuEl.style.display !== 'block'){
//     menuEl.style.display = 'block'
//     filterCheck = true;
//   } else {
//     menuEl.style.display = 'none'
//     filterCheck = false;
//   }

// }

function roleSortingOwner(data){
  dataSorted = data
  console.log(dataSorted)
  console.log('dd')
}

function roleSortingAdmin(data){
  dataSorted = data
  console.log(dataSorted)
}

function showData (data) {
  console.log(filterCheck)
  let view;
  console.log(view)
  
  view = data.slice(0,5)
  const AllPage = data.length;

  const ViewPage = AllPage/5
   console.log(view)
  getData(view)

  const $page = document.getElementById('pagination');
  const pageNumber = $page.children;

  let  first = 0
  for(let i = 0; i<pageNumber.length; i++){
    pageNumber[i].addEventListener('click', ()=>{ 
        switch(i){
          case 0:
          case 1:
            first = 0
            break;
          case 2:
            first = 5
            break;
          case 3:
            first = 10
            break;
          case 4:
            first = 15
            break;
          case 5:
          case 6:
            first = 20
            break;
        }

        view = data.slice(first, first+ViewPage)
        getData(view)
      })
  }

}

const getData = (view) => {
  let body ='';
  
  view.forEach(item => { 
    const {name, title, email, role} = item
    
    body += (`<tr>
        <td>${name}</td>
        <td>${title}</td>
        <td>${email}</td>
        <td>${role}</td>
      </tr>`
    )  
  
}) 
    
  tablebody.innerHTML = body;
  tableContents.appendChild(tablebody)


}



document.querySelector('#header').style.backgroundColor = 'lightgray';





filterEl[0].addEventListener('click', handleMenu)

menuContent.forEach(liEl => {
  if(liEl.innerText === '오름차순1'){
    menuEl.children[0].style.pointerEvents = 'none';
    menuEl.children[0].style.color = 'gray';
  }

  liEl.addEventListener('click', (e)=>{
    if(e.target.innerText === '내림차순2'){
      showData(dataSorted)
      menuEl.children[1].style.pointerEvents = 'none';
      menuEl.children[1].style.color = 'gray';
      menuEl.children[0].style.color = 'black'; 
      menuEl.children[0].style.pointerEvents = 'auto';
      
    }
    if(e.target.innerText === '오름차순1'){
      showData(dataSorted)
      menuEl.children[0].style.pointerEvents = 'none';
      menuEl.children[1].style.color = 'black';
      menuEl.children[0].style.color = 'gray';
      menuEl.children[1].style.pointerEvents = 'none';
    }
    if(e.target.innerText === 'Owner3'){
      showData(dataSorted)
    }
    if(e.target.innerText === 'admin4'){
      showData(dataSorted)
    }

  })
})

