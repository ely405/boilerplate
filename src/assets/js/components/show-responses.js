'use strict';

const createShowReponsesModal = (topicResponses, topicById)=>{
    let modalDialog = $('<div class="modal-dialog"></div>');
    let modalContent = $('<div class="modal-content"></div>');
    let modalBody = $('<div class="modal-body"></div>');
    let btnClose = $('<button type="button" class="close" data-dismiss="modal">&times;</button>');
    let title = $('<h2 class="modal-title">Foro cool</h2>');
    let subTitle = $('<h2 class="modal-title">Respuestas</h2>');
    let responsesContainer = $('<div class="col-xs-10"></div>');
    let topicContainer = $('<div class="col-xs-12"></div>');
    let btnCreateTopic = $('<button type="submit" class="btn btn-default" id="btn-create-res" data-dismiss="modal">Crear respuesta</button>');

    if(topicResponses != null){
        console.log(topicResponses)
        if(topicResponses.error){
            responsesContainer.append(topicResponses.error);
        }else{
            $.each(topicResponses, (i, data)=>{
                console.log(data);
                let resp = aResponse(data);
                responsesContainer.append(resp);
            });          
        }
    }

    if(topicById != null){
        console.log(topicById);
        let topic = aResponse(topicById);
        topicContainer.append(topic);
    }

    modalBody.append(btnClose, title, topicContainer, subTitle, responsesContainer, btnCreateTopic);
    modalDialog.append(modalContent.append(modalBody));

    return modalDialog;
}

const aResponse = (response)=>{
    let container = $('<div class="col-xs-10"></div>');
    let contentRes = $('<h5></h5>').html(response.content);
    let authorRes = $('<p><strong>por </strong>'+response.author_name+'</p>');

    return container.append(contentRes, authorRes);
}

