import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function CompareDataDisplay(props){

    // both should be same length arrays
    const primaryUserAchievements = props.primaryUserAchievements;
    const secondaryUserAchievements = props.secondaryUserAchievements;
    const globalData = props.globalData;

    const primaryUser = props.primaryUser;
    const secondaryUser = props.secondaryUser;
    return <>
    
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Achievement</th>
            <th>{primaryUser}</th>
            <th>{secondaryUser}</th>
            <th>Global Percent Achieved</th>
            </tr>
        </thead>
        <tbody>
            {/* create a table with entries: Achievment | ${primaryUser} | ${secondaryUser} */
                primaryUserAchievements?.map((ach, index) => {
                        // case 1 if ach.achieved == 1 and secondaryUserAchievements[index].achieved == 1
                        // case 2 if ach.achieved == 1 and secondaryUserAchievements[index].achieved == 0
                        // case 3 if ach.achieved == 0 and secondaryUserAchievements[index].achieved == 1
                        // case 4 if ach.achieved == 0 and secondaryUserAchievements[index].achieved == 0
                        // 🗸
                        let percent = props.globalData?.achievementpercentages?.
                        achievements?.find(a => a.name === ach.apiname)?.percent || 0;
                        return(
                            <tr key={ach.apiname + index}>
                                <td>{ach.apiname}</td>
                                <td>{ach.achieved ? '🗸' : ''}</td>
                                <td>{secondaryUserAchievements[index].achieved ? '🗸' : ''}</td>
                                <td>{percent}%</td>
                                    
                            </tr>
                        )
                })
            }
        </tbody>
    </Table>
    
    
    </>;
}

export default CompareDataDisplay;