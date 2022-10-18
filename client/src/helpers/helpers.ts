export  function convertDate(date: Date){
    
    let day : string = date.toLocaleString('en-us', { day: 'numeric' });
    let month : string = date.toLocaleString('en-us', { month: 'long' });
    return day + " " + month
}

