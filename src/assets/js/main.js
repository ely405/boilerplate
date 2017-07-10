'use strict';

const render = (root) => {
    const wrapper = $('<div class="wrapper"></div>');
    wrapper.append(createAllTopic(state.topics, _ => {render(root)}));    
    wrapper.append(createTopicModal(_ => {render(root)}));    
    wrapper.append($('<div class="modal fade" id="show-response" role="dialog"></div>'));
    root.append(wrapper);
}

const state = {
    topics: null,
    topicById: null,
    topicResponses: null
};

$(_ => {
    $.get('http://examen-laboratoria-sprint-5.herokuapp.com/topics', (response)=>{
        state.topics = response;
        const root = $('#root');
        render(root);
    });

});

