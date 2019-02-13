// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = async function (req,res,next) {
  
  if (res.data.data && res.data.data.length > 0) {
    let tagList  = [];
    res.data.data.forEach(function(tag) {
      tagList.push(tag.name);
    });
    res.data = {tags: tagList};
  } else {
    res.data = {tags: []};
  }

  next();
};
