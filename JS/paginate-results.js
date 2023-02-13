/* query is made to a routes something like this : 
http://localhost:3000/posts?page=2
 */

// replace Model with required model like user , posts , blogs etc

async function paginateResults(req, res, next) {
    try {
        let { page } = req.query;
        page = parseInt(page);
        //if no page no defined then go to 1
        if (!page)
            page = 1;

        // start and end number of posts to be displayed
        const start = (page - 1) * limit;
        const end = page * limit;

        const results = {}

        // calculate prev page no. if there is one ; same for next page no.
        if (start > 0)
            results.prev = page - 1;
        if (end < await Model.countDocuments())
            results.next = page + 1;

        // find limited no of posts in order of date
        // use required conditions 
        results.data = await Model.find({}, { title: 1, description: 1, created: 1 }).sort({ created: 'desc' }).limit(limit).skip(start).exec();

        res.send(results);
    } catch (e) {
        console.log(e);
    }

}

