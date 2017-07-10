'use strict';

const render = (root) => {
    const wrapper = $('<div class="wrapper"></div>');
    wrapper.append(createAllTopic(state.topics, _ => {render(root)}));    
    wrapper.append(createTopicModal(_ => {render(root)}));    
    root.append(wrapper);
}

const state = {
    topics: null,
};

$(_ => {
    $.get('http://examen-laboratoria-sprint-5.herokuapp.com/topics', (response)=>{
        state.topics = response;
        const root = $('#root');
        render(root);
    });
    
});

