const arrayOfArray = (arr) => {
    const itemsPerPage = 10;
    const result = [];
    const pages = Math.ceil(arr.length / itemsPerPage);
    for (let index = 0; index < pages; index++) {
        result.push(
            arr.slice(index * itemsPerPage, itemsPerPage + itemsPerPage * index)
        );
    }
    return result;
};

export default arrayOfArray;
