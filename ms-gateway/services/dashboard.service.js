const axios = require('axios').default;

async function dashboardData() {
    const vacanciesCount = await getVacanciesCount();
    const shortlistedCandidatesCount = await getShortlistedCandidatesCount();
    const resumeParsedCount = await getResumeParsedCount();

    const data = {
        vacanciesCount,
        shortlistedCandidatesCount,
        resumeParsedCount,
        interviewsScheduledCount: 5
    };

    return data;
}

async function getVacanciesCount() {
    const vacanciesCount = await axios.get("http://localhost:10000/admin/v1/vacancies");
    return vacanciesCount.data.total;
}

async function getShortlistedCandidatesCount() {
    const shortlistedCandidatesCount = await axios.get("http://localhost:10000/admin/v1/vacancies");
    return shortlistedCandidatesCount.data.total;
}

async function getResumeParsedCount() {
    const resumeParsedCount = await axios.get("http://localhost:10000/admin/v1/vacancies");
    return resumeParsedCount.data.total;
}

module.exports = {
    dashboardData
}