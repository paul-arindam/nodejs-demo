var del=document.querySelectorAll('.del')
del.forEach(tag=> tag.addEventListener('click', e=>{
    if(confirm('Are You sure?'))    
    {   empID=e.target.getAttribute('empId')
        fetch('/delete/' + empID, {
        method: 'DELETE',
        })
        .then(res => alert(res));
        window.location.href='/getAll';
    }
}))

