const service = {};

service.getData = async () => {

    const response = await fetch('./data/data.json');
    return await response.json();

};

service.getTime = async () => {
  
    let d = new Date(),
        s = d.getSeconds(),
        m = d.getMinutes(),
        h = d.getHours();

    return {s, m, h}
      
}

export default service;

