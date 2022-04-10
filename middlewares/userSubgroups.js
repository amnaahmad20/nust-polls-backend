import Student from '../models/student.js';

const userSubgroups = async (req, res, next) => {
  const adminTitle = req.user.title;
  let subgroups;
  let latestBatch = (await Student.distinct('batch')).reverse()[0];

  switch (true) {
    case /^DD in NUST Main Office$/.test(adminTitle):
      const graduateLevel = await Student.distinct('graduateLevel');
      const school = await Student.distinct('school');
      subgroups = { graduateLevel, school };
      break;

    case /^DD Hostel$/.test(adminTitle):
      const hostel = await Student.distinct('hostel');
      subgroups = { hostel };
      break;

    case /^DD Student Affairs$/.test(adminTitle):
      const designation = await Student.distinct('societies.designation');
      const society = await Student.distinct('societies.name');
      subgroups = { designation, society };
      break;

    case /^DD Transport$/.test(adminTitle):
      const route = await Student.distinct('transport.route');
      subgroups = { route };
      break;

    case /^Faculty Sponsor-/.test(adminTitle):
      const degree = await Student.find({
        school: /-(.*)/.exec(adminTitle),
      }).distinct('degree');
      subgroups = { degree };
      break;

    case /^Faculty Sponsor UG Freshman Batch-/.test(adminTitle):
      subgroups = await batchAdmin(/-(.*)/.exec(adminTitle), latestBatch, 'UG');
      break;

    case /^Faculty Sponsor UG Sophomore Batch-/.test(adminTitle):
      subgroups = await batchAdmin(
        /-(.*)/.exec(adminTitle),
        latestBatch - 1,
        'UG'
      );
      break;

    case /^Faculty Sponsor UG Junior Batch-/.test(adminTitle):
      subgroups = await batchAdmin(
        /-(.*)/.exec(adminTitle),
        latestBatch - 2,
        'UG'
      );
      break;

    case /^Faculty Sponsor UG Senior Batch-/.test(adminTitle):
      subgroups = await batchAdmin(
        /-(.*)/.exec(adminTitle),
        latestBatch - 3,
        'UG'
      );
      break;

    case /^Faculty Sponsor PG 1st Year Batch-/.test(adminTitle):
      subgroups = await batchAdmin(/-(.*)/.exec(adminTitle), latestBatch, [
        'MS',
        'PhD',
      ]);
      break;

    case /^Faculty Sponsor PG 2nd Year Batch-/.test(adminTitle):
      subgroups = await batchAdmin(
        /-(.*)/.exec(adminTitle),
        latestBatch - 1,
        'MS',
        'PhD'
      );
      break;

    default:
      subgroups = {};
  }
  console.log(subgroups);
  next();
};

const batchAdmin = async (school, batch, graduateLevel) => {
  const search = { school, batch: batch, graduateLevel };
  const degree = await Student.find(search).distinct('degree');
  const section = await Student.find(search).distinct('section');
  const department = await Student.find(search).distinct('department');
  const subgroups = { degree, section, department };
  return subgroups;
};

export default userSubgroups;
