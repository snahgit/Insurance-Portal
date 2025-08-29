import moment from "moment";
export const convertVisitDataToCalendarData = (visitData: any[]): Record<string, number> => {
    const dateData: Record<string, number> = {};
    
    visitData.forEach((visit) => {
        if (visit.visitDate) {
            // Convert DD/MM/YYYY to YYYY-MM-DD for calendar
            const momentDate = moment(visit.visitDate, "DD/MM/YYYY");
            if (momentDate.isValid()) {
                const dateStr = momentDate.format("YYYY-MM-DD");
                dateData[dateStr] = (dateData[dateStr] || 0) + 1;
            }
        }
    });
    
    return dateData;
};
export const filterVisitDataByDate = (visitData: any[], selectedDate: string): any[] => {
    if (!selectedDate) return visitData;
    
    const selectedMoment = moment(selectedDate, "YYYY-MM-DD");
    
    return visitData.filter((visit) => {
        if (visit.visitDate) {
            const visitMoment = moment(visit.visitDate, "DD/MM/YYYY");
            return visitMoment.isSame(selectedMoment, "day");
        }
        return false;
    });
};
