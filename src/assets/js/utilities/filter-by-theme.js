'use strict';

const filterByTheme = (allTopic,filterInput) => {
    return allTopic.filter((e)=>{
        return e.content.toLowerCase().indexOf(filterInput.trim().toLowerCase()) != -1;
    });
}