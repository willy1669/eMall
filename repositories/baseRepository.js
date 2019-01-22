function BaseRepository(model){
    if(!model) throw new Error('A model must be provided');
    this.model = model;
}

BaseRepository.prototype.add = function(data, callback){
    this.model.create(data, callback);
}