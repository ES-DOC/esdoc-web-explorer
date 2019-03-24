export default (s) => {
    [
        setSubProcesses,
        setTopics,
        setDepths
    ].forEach(f => f(s))
}

const setDepths = (s) => {
    s.depth = 1
    s.processes.forEach(p => {
        p.depth = 2
        p.subProcesses.forEach(sp => {
            sp.depth = 3
        })
    })
}

const setSubProcesses = (s) => {
    s.processes.forEach((p) => {
        p.subProcesses = p.subProcesses || []
    })
}

const setSubTopics = (s) => {
    s.subTopics = [s.keyProperties, s.grid]
    s.topics = [s];
    s.processes.forEach((p) => {
        s.topics = s.topics.concat([p].concat(p.subProcesses))
    })
    s.topics = s.topics.filter(i => i !== undefined)
}

const setTopics = (s) => {
    s.topics = [s];
    s.processes.forEach((p) => {
        s.topics = s.topics.concat([p].concat(p.subProcesses))
    })
    s.topics = s.topics.filter(i => i !== undefined)
}
