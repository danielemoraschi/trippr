/**
 * Created by dmoraschi on 06/02/2017.
 */

import lunr from 'lunr';

const Lunr = (() => {

    /**
     *
     */
    const defaultConfig = function () {
        this.field('title', { boost: 10 });
        this.field('toTitle', { boost: 7 });
        this.field('fromTitle', { boost: 3 });
        this.ref('index');
    };

    /**
     *
     * @type {lunr}
     */
    let index = construct(defaultConfig);

    /**
     *
     * @returns lunr
     * @constructor
     */
    function construct(config) {
        return lunr(config);
    }

    /**
     *
     * @param item
     * @param itemIndex
     */
    function addToIndex(item, itemIndex) {
        index.add({
            id: item._id,
            index: itemIndex,
            title: item.title,
            fromTitle: item.from.title,
            toTitle: item.to.title,
        });
    }


    return {
        newIndex: construct,
        addToIndex: addToIndex,
        search: index.search.bind(index),
    }

})();


export default Lunr;