
export default {

    props: ['item', 'attr'],
    setup(){
        
    },
    
    template: `
        <div>
            <p class='info-item-attribute'> {{ attr.toUpperCase() }} </p>
            <p class='info-item-value'> {{ item.toString().toUpperCase() }}</p>
        </div>
    `
}