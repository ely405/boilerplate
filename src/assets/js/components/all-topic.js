'use strict';

const topic = (topicDetails)=>{
    let containerTopic = $('<div class="row"></div>');
    let theme = $('<div class="col-xs-4">'+ topicDetails.content +'</div>');
    let author = $('<div class="col-xs-4">'+ topicDetails.author_name +'</div>');
    let responsesCount = $('<div class="col-xs-4"></div>');
    let btnResponse = $('<button type="button" class="btn btn-info btn-response" data-id="'+topicDetails.id+'">'+topicDetails.responses_count+' respuestas</button>')
    return containerTopic.append(theme, author, responsesCount.append(btnResponse));
}

const createAllTopic = (topicsList, update)=>{
    let containerAll = $('<section class="container-fluid">');
    let title = $('<h1 class="text-center">Foro cool</h1>');
    let btnCreate = $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#create-topic">Crear tema</button>');
    let filterInp = $('<input type="text" class="form-control" id="filter-inp">');
    let header = $('<div class="row"></div>');
    let headerTheme = $('<div class="col-xs-4"><strong>Tema</strong></div>');
    let headerAuthor = $('<div class="col-xs-4"><strong>Autor</strong></div>');
    let headerResponse = $('<div class="col-xs-4"><strong>Respuestas</strong></div>');
    let allTopicContainer = $('<div id="all-topic-container"></div>');

    filterInp.on('keyup', ()=>{
        reRender(allTopicContainer, filterInp.val());
    })
    
    reRender(allTopicContainer, '');
    header.append(headerTheme, headerAuthor, headerResponse);
    return containerAll.append(title, btnCreate, filterInp, header, allTopicContainer);
}

const reRender = (container, filter)=>{
    container.empty();
    let filteredTheme = filterByTheme(state.topics, filter);
    if(filteredTheme.length > 0){
        $.each(filteredTheme, (i, data)=>{
            let t = topic(data);
            container.append(t);
        });
    }else{
    container.append($('<p/>').html('Tema no encontrado'));
  }
}

