import { useState, useEffect } from 'react';
import moment from 'moment'; 
import { firebase } from '../firebase';
import '@firebase/firestore';
import { collatedTasksExist } from '../helpers';
import { initializeApp } from 'firebase/app';


export const useTasks = selectProject => {
    const[tasks, setTasks] = useState([]);
    const[archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', 'fatcat');

        unsubscribe = selectProject && !collatedTasksExist(selectProject) ?
        (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where
            ('data', 
            '==',
             moment().format('DD/MM/YYYY')
             ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('data', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task ({
            id: task.id,
            ...task.data(),
        }));

        setTasks(
            selectProject === 'NEXT_7'
            ? newTasks.filter(
                task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && 
                task.archived !== true 
            )
            : newTasks.filter(task => task.archived !== true)
        );
        
        setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });
    }, [selectProject]);

    return {tasks, archivedTasks};
}

export const useProjects = () => {
    const[projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', 'fatcat')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            if(JSON.stringify(allProjects)!== JSON.stringify(projects)){
                setProjects(allProjects);
            }
        })

    }, [projects]); 

    return{ projects, setProjects };
}

