const axios = require('axios').default;
var moment = require('moment'); 

const URL = `https://api.reddit.com/r/artificial/hot?limit=100`
const DATA_FORMAT = "DD/MM/YY HH:mm:ss"
function requisicaoPostagem(after, data) {
    
    return axios.get(URL  + (after ? '&after='+after : '')) 
      .then(response => {
        
        if (response.data.data.after == null){
            obj = response.data.data.children.map(el =>({
                TITULO: el.data.title,
                AUTOR : el.data.author ,
                CRIACAO : el.data.created_utc,
                NUMBER_UPS: el.data.ups,
                NUMBER_COMENTARIOS: el.data.num_comments,
                
            }))
            data.push(...obj)
            
            return data
        } 
        
        obj = response.data.data.children.map(el =>({
                TITULO: el.data.title,
                AUTOR : el.data.author ,
                CRIACAO :  el.data.created_utc ,
                NUMBER_UPS: el.data.ups,
                NUMBER_COMENTARIOS: el.data.num_comments
                
            }))
        data.push(...obj)
        return requisicaoPostagem(response.data.data.after, data)
      })
}

module.exports.requisicaoPostagem = requisicaoPostagem;



