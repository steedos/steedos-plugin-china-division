const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const objectql = require('@steedos/objectql')


const provinces = require('china-division/dist/provinces.json');
const cities = require('china-division/dist/cities.json');
const areas = require('china-division/dist/areas.json');

// declare var Creator: any;
// declare var Meteor: any;
// declare var Steedos: any;

router.get('/api/data/provinces/init', core.requireAuthentication, async function (req, res) {
    try {
        const userSession = req.user;
        const spaceId = userSession.spaceId;
        const userId = userSession.userId;
        // const isSpaceAdmin = userSession.is_space_admin;

        const provinceCollection = await objectql.getObject("provinces__c");
        
        for(let province of provinces){
            await provinceCollection.insert({
                name: province.name,
                code__c: province.code,
                space: spaceId
            }, userSession);
        }
        
        const cityCollection = await objectql.getObject("cities__c");

        for(let city of cities){
            await cityCollection.insert({
                name: city.name,
                code__c: city.code,
                province_code__c: city.provinceCode,
                space: spaceId
            }, userSession);
        }

        const areaCollection = await objectql.getObject("areas__c");

        for(let area of areas){
            await areaCollection.insert({
                name: area.name,
                code__c: area.code,
                city_code__c: area.cityCode,
                province_code__c: area.provinceCode,
                space: spaceId
            }, userSession);
        }
        res.status(200).send({ message: 'SUCCESS', success: true,  });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});
exports.default = router;

