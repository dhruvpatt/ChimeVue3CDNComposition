import emitter from "../event-bus.js";
const { computed } = Vue;
export default {
    props: ['result'],

    setup(props){
        const getIconStyle = computed(() => {
            return {
                backgroundImage: `url(./assets/${props.result.type}.png)`, // Adjust the path as necessary
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                backgroundSize: 'contain'
              };
        })

        function handleClick() {
            // sends and event to with the title resultClicked to the parent component
            emitter.emit("resultClicked", props.result.item);

        }

        const getSearchResult = computed(() => {
            if(props.result.type == 'person'){
                const fullName = `${props.result.item.firstname} ${props.result.item.lastname}`;
                const query = props.result.match;
                var beforeMatch;
                var match;
                var afterMatch;
                const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase())
                var ret;
                if (fullName.length > 20){
                    // if the start index is greater than 10, then we can display a truncated name from both sides
                    
                    if (startIndex > 10){
                        beforeMatch = fullName.substring(startIndex - 10, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                        // span to add the search highlights
                        ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    } else {
                        beforeMatch = fullName.substring(0, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                        ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    }
                    
                }
                else {
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
                }
    
                return ret;
            }
    
            else if (props.result.type == "place"){
                const fullName = `${props.result.item.name}`;
                var beforeMatch;
                var match;
                var afterMatch;
                const query = props.result.match;
                var ret;
                const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase())
                // if the name is too big to display then we need to truncate it.
                if (fullName.length > 20){
                    
                    // if the start index is greater than 10, then we can display a truncated name from both sides
                    
                    if (startIndex > 10){
                        beforeMatch = fullName.substring(startIndex - 10, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + match.length + 10)
                        ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    } else {
                        beforeMatch = fullName.substring(0, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                        ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    }
                }
    
                else{ 
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
                }
                return ret
            }
    
            else if (props.result.type == 'quote'){
                const fullName = `${props.result.item.description}`; 
                var query = props.result.match;
                var ret;
                var beforeMatch;
                var match;
                var afterMatch;
                const startIndex = fullName.toLowerCase().indexOf(query.toLowerCase());
                // if the name is too big to display then we need to truncate it.
                if (fullName.length > 20){
                    
                    // if the start index is greater than 10, then we can display a truncated name from both sides
                    ;
                    if (startIndex > 10){
                        beforeMatch = fullName.substring(startIndex - 10, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                        ret = '...' + beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    } else {
                        beforeMatch = fullName.substring(0, startIndex)
                        match = fullName.substring(startIndex, startIndex + query.length)
                        afterMatch = fullName.substring(startIndex + query.length, startIndex + 10 + match.length)
                        ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch + '...';
                    }
                }
                else {
                    beforeMatch = fullName.substring(0, startIndex)
                    match = fullName.substring(startIndex, startIndex + query.length)
                    afterMatch = fullName.substring(startIndex + query.length, fullName.length)
                    ret = beforeMatch + '<span class="highlight">' + match + '</span>' + afterMatch;
                }
    
                return ret;
    
            }
        })

        return {
            getIconStyle,
            getSearchResult,
            handleClick,
        }

    },

    template: `
    <li class='search-result' :style="getIconStyle">
        <button class='search-result-btn' v-html="getSearchResult" @click="handleClick"></button>
    </li>
    
    `

}