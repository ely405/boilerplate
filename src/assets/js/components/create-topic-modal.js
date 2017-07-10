'use strict';

const createTopicModal = (update)=>{
    let containerModal = $('<div class="modal fade" id="create-topic" role="dialog"></div>');
    let modalDialog = $('<div class="modal-dialog"></div>');
    let modalContent = $('<div class="modal-content"></div>');
    let modalBody = $('<div class="modal-body"></div>');
    let btnClose = $('<button type="button" class="close" data-dismiss="modal">&times;</button>');
    let title = $('<h4 class="modal-title">Foro cool</h4>');
    let form = $('<form id="create-form" method="post"></form>');
    let nameContainer = $('<div class="form-group"></div>');
    let inpName = $('<input type="text" class="form-control" id="name" placeholder="Ingresa Nombre">');
    let messageContainer = $('<div class="form-group"></div>');
    let inpMessage = $('<textarea class="form-control" id="message" placeholder="Ingresa mensaje"></textarea>');
    let btnCreateTopic = $('<button type="submit" class="btn btn-default" id="btn-create" data-dismiss="modal">Crear tema</button>');

    form.append(nameContainer.append(inpName), messageContainer.append(inpMessage), btnCreateTopic);
    modalBody.append(btnClose, title, form);
    modalDialog.append(modalContent.append(modalBody));
    containerModal.append(modalDialog);

    inpName.on('change', ()=>{
        dataToSend.author_name = $('#name').val();
    })

    inpMessage.on('change', ()=>{
        dataToSend.content = $('#message').val();
    })
    const dataToSend = {
        "author_name": $('#name').val(),
        'content': $('#message').val()
    }

    btnCreateTopic.click((e)=>{
        e.preventDefault();
        $.ajax({url: "https://private-anon-4e39fc48cf-foroapi.apiary-proxy.com/topics",
                type: 'POST',
                data: JSON.stringify(dataToSend),
                contentType: 'application/json',
                success: (result)=>{
                    let containerTopic = $('<div class="row">');
                    let theme = $('<div class="col-xs-4"></div>').html(result.content);
                    let author = $('<div class="col-xs-4"></div>').html(result.author_name);
                    let createdAt = $('<div class="col-xs-4"></div>').html(result.created_at);
                    containerTopic.append(theme, author, createdAt);
                    $('#all-topic-container').prepend(containerTopic);
                },
                statusCode: {
                    422: function() {
                        alert('Completa los campos para crear la tarea');
                    }
                }});
        $('form')[0].reset();
        dataToSend.author_name = '';
        dataToSend.content = '';
    })

    return containerModal;
}