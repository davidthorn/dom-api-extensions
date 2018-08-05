const styles = [
    "height" , 
    "float",
    "width" ,
    "color",
    "background-color"
];

const handleColumnsSelector = (parent) => {

    styles.forEach((v) => {
        handleSelector(document, v , setStyleProperty)
    })

    const rows = parent.getElementsByClassName('row');

    if(rows.length === 0) {
        return;
    }

    Array.from(rows).forEach(row => {

        const rect = row.getBoundingClientRect();
        let cols = row.querySelectorAll('[col]');

        cols.forEach(col => {
            col.setAttribute('style' , "float: left;" );
            const size = col.getAttribute('col');
            setStyleProperty("width" , col , size + "%");
            setStyleProperty("height" , col , "stretch");
        });

    });

}

const setStyleProperty = (axis, item , size) => {
    const rect = item.getBoundingClientRect();
    const parentRect = item.parentNode.getBoundingClientRect();
    
    switch(axis) {
        case "float":
            switch(size) {
                case "center":
                
                const left = (parentRect.width - rect.width ) / 2;
                setStyleProperty("marginLeft" , item , left + "px");
                break;
                case "middle":
                const top = (parentRect.height - rect.height ) / 2;
                setStyleProperty("marginTop" , item , top + "px");
                setStyleProperty("float" , item , "center");
                break;
                case "bottom":
                const marginTop = (parentRect.height - rect.height );
                setStyleProperty("marginTop" , item , marginTop + "px");
                break;
                default: 
                item.style[axis] = size;
                break;
            }
        break;
        default:
            switch(size) {
            case "stretch":
                setStyleProperty(axis , item , parentRect[axis]);
            break;
            default:
            item.style[axis] = size;
            }
        break;
    }
}

const handleSelector = (parent, selector , cb) => {
    
    /// Find all tags which have the attribute module
    const items = parent.querySelectorAll("["+selector+"]");
    
    /// iterate through all elements which the query has found
    items.forEach(item => {
        const value = item.getAttribute(selector); 
        cb(selector ,item, value)
    });
}

const stylesWindowLoaded = () => {
    handleColumnsSelector(document);
}

if (window.ready === undefined ) {
    window.ready = [];
}

window.ready.push(stylesWindowLoaded);