/**
 * Created by dmoraschi on 16/01/2017.
 */

import React from 'react';
import Store from 'react-native-store';


/**
 *
 * @type {{Routes: *}}
 */
const DB = {
    'Routes': Store.model('routes'),
};

/**
 *
 * @param item
 * @returns {*}
 */
const addDefaults = item => {
    let now = Date.now();
    item.archived   === undefined && (item.archived = false);
    item.created_at === undefined && (item.created_at = now);
    item.updated_at === undefined && (item.updated_at = now);
    return item;
};

/**
 *
 * @type {{findAll: (()), findById: ((p1?:*)), add: ((p1?:*)), multiAdd: ((p1?:*)), updateById: ((p1?:*, p2?:*)), archiveById: ((p1?:*)), restoreById: ((p1?:*)), removeById: ((p1?:*)), destroy: (())}}
 */
let RouteRepository = {

    /**
     *
     */
    findAll: () => {
        return DB.Routes.find({
            where: {
                and: [{ archived: false }],
            },
            order: {
                updated_at: 'DESC',
            }
        });
    },

    /**
     *
     * @param id
     * @returns {*}
     */
    findById: (id) => {
        return DB.Routes.findById(id);
    },

    /**
     *
     * @param item
     */
    add: (item) => {
        return DB.Routes.add(addDefaults(item));
    },

    /**
     *
     * @param items
     * @returns {*|Promise}
     */
    multiAdd: (items) => {
        let promises = items.map(addDefaults);

        return Promise.all(promises).then(() => {
            return DB.Routes.multiAdd(items);
        });
    },

    /**
     *
     * @param item
     * @param id
     * @returns {*}
     */
    updateById: (item, id) => {
        item.updated_at = Date.now();
        return DB.Routes.updateById(item, id);
    },

    /**
     *
     * @param id
     * @returns {*}
     */
    archiveById: (id) => {
        return DB.Routes.updateById({
            archived: true,
        }, id);
    },

    /**
     *
     * @param id
     * @returns {*}
     */
    restoreById: (id) => {
        return DB.Routes.updateById({
            archived: false
        }, id);
    },

    /**
     *
     * @param id
     * @returns {*}
     */
    removeById: (id) => {
        return DB.Routes.removeById(id);
    },

    /**
     *
     * @returns {*|Boolean|Session|void}
     */
    destroy: () => {
        return DB.Routes.destroy();
    },
};


export default RouteRepository;