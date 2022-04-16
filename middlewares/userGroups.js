import Student from '../models/student.js';

let subgroups = {};
let userGroup = {};

const userSubgroups = async (req, res, next) => {
  const adminTitle = req.user.title;
  const latestBatch = (await Student.distinct('batch')).reverse()[0];

  switch (true) {
    case /^DD in NUST Main Office$/.test(adminTitle):
      const graduateLevel = await Student.distinct('graduateLevel');
      const school = await Student.distinct('school');
      subgroups = { graduateLevel, school };
      break;

    case /^DD Hostel$/.test(adminTitle):
      userGroup = {
        status: 'Hostellite',
      };
      const hostel = await Student.distinct('hostel');
      subgroups = { hostel };
      break;

    case /^DD Student Affairs$/.test(adminTitle):
      userGroup = {
        societies: { $exists: true, $ne: [] },
      };
      const designation = await Student.distinct('societies.designation');
      const society = await Student.distinct('societies.name');
      subgroups = {
        'societies.designation': designation,
        'societies.name': society,
      };
      break;

    case /^DD Transport$/.test(adminTitle):
      userGroup = {
        status: 'Dayscholar',
        'transport.pickAndDrop': true,
      };
      const route = await Student.distinct('transport.route');
      subgroups = { 'transport.route': route };
      break;

    case /^Faculty Sponsor-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
      };
      const degree = await Student.find(userGroup).distinct('degree');
      subgroups = { degree };
      break;

    case /^Faculty Sponsor UG Freshman Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: latestBatch,
        graduateLevel: 'UG',
      };
      subgroups = await batchAdmin(userGroup);
      break;

    case /^Faculty Sponsor UG Sophomore Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: (latestBatch - 1).toString(),
        graduateLevel: 'UG',
      };
      subgroups = await batchAdmin(userGroup);
      break;

    case /^Faculty Sponsor UG Junior Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: (latestBatch - 2).toString(),
        graduateLevel: 'UG',
      };
      subgroups = await batchAdmin(userGroup);
      break;

    case /^Faculty Sponsor UG Senior Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: (latestBatch - 3).toString(),
        graduateLevel: 'UG',
      };
      subgroups = await batchAdmin(userGroup);
      break;

    case /^Faculty Sponsor PG 1st Year Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: latestBatch,
        graduateLevel: ['MS', 'PhD'],
      };
      subgroups = await batchAdmin(userGroup);
      break;

    case /^Faculty Sponsor PG 2nd Year Batch-/.test(adminTitle):
      userGroup = {
        school: /-(.*)/.exec(adminTitle)[1],
        batch: (latestBatch - 1).toString(),
        graduateLevel: ['MS', 'PhD'],
      };
      subgroups = await batchAdmin(userGroup);
      break;

    default:
      subgroups = {};
  }
  req.subgroups = subgroups;
  next();
};

const batchAdmin = async (userGroup) => {
  const data = await Student.aggregate([
    {
      $match: userGroup,
    },
    {
      $group: {
        _id: { department: '$department', degree: '$degree' },
        section: { $addToSet: '$section' },
      },
    },
    {
      $group: {
        _id: '$_id.department',
        section: { $push: { degree: '$_id.degree', section: '$section' } },
      },
    },
  ]);
  const subgroups = data.reduce(
    (obj, item) => ((obj[item._id] = item.section), obj),
    {}
  );
  return subgroups;
};

const pollAudience = (req, res, next) => {
  req.audience = { ...userGroup, ...req.body };
  next();
};

export { userSubgroups, pollAudience };
