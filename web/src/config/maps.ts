import {
  EducationLevel,
  IncidentLocation,
  MilitaryBranch,
  State,
} from './enums';

export const educationLevelMap = new Map([
  [EducationLevel.NONE, 'None'],
  [EducationLevel.HIGH_SCHOOL, 'High School'],
  [EducationLevel.TRADE_SCHOOL, 'Trade School'],
  [EducationLevel.BACHELORS, 'Bachelors'],
  [EducationLevel.MASTERS, 'Masters'],
  [EducationLevel.DOCTORATE, 'Doctorate'],
]);

export const incidentLocationMap = new Map([
  [IncidentLocation.NONE, 'None'],
  [IncidentLocation.HOME, 'Home'],
  [IncidentLocation.HOSPITAL, 'Hospital'],
  [IncidentLocation.NURSING_HOME, 'Nursing Home'],
  [IncidentLocation.OTHER, 'Other'],
]);

export const militaryBranchMap = new Map([
  [MilitaryBranch.NONE, 'None'],
  [MilitaryBranch.AIR_FORCE, 'Air Force'],
  [MilitaryBranch.ARMY, 'Army'],
  [MilitaryBranch.COAST_GUARD, 'Coast Guard'],
  [MilitaryBranch.MARINES, 'Marines'],
  [MilitaryBranch.NAVY, 'Navy'],
  [MilitaryBranch.SPACE_FORCE, 'Space Force'],
]);

export const stateMap = new Map([
  [State.NONE, 'None'],
  [State.ALABAMA, 'Alabama'],
  [State.ALASKA, 'Alaska'],
  [State.ARIZONA, 'Arizona'],
  [State.ARKANSAS, 'Arkansas'],
  [State.CALIFORNIA, 'California'],
  [State.COLORADO, 'Colorado'],
  [State.CONNECTICUT, 'Connecticut'],
  [State.DELAWARE, 'Delaware'],
  [State.FLORIDA, 'Florida'],
  [State.GEORGIA, 'Georgia'],
  [State.HAWAII, 'Hawaii'],
  [State.IDAHO, 'Idaho'],
  [State.ILLINOIS, 'Illinois'],
  [State.INDIANA, 'Indiana'],
  [State.IOWA, 'Iowa'],
  [State.KANSAS, 'Kansas'],
  [State.KENTUCKY, 'Kentucky'],
  [State.LOUISIANA, 'Louisiana'],
  [State.MAINE, 'Maine'],
  [State.MARYLAND, 'Maryland'],
  [State.MASSACHUSETTS, 'Massachusetts'],
  [State.MICHIGAN, 'Michigan'],
  [State.MINNESOTA, 'Minnesota'],
  [State.MISSISSIPPI, 'Mississippi'],
  [State.MISSOURI, 'Missouri'],
  [State.MONTANA, 'Montana'],
  [State.NEBRASKA, 'Nebraska'],
  [State.NEVADA, 'Nevada'],
  [State.NEW_HAMPSHIRE, 'New Hampshire'],
  [State.NEW_JERSEY, 'New Jersey'],
  [State.NEW_MEXICO, 'New Mexico'],
  [State.NEW_YORK, 'New York'],
  [State.NORTH_CAROLINA, 'North Carolina'],
  [State.NORTH_DAKOTA, 'North Dakota'],
  [State.OHIO, 'Ohio'],
  [State.OKLAHOMA, 'Oklahoma'],
  [State.OREGON, 'Oregon'],
  [State.PENNSYLVANIA, 'Pennsylvania'],
  [State.PUERTO_RICO, 'Puerto Rico'],
  [State.RHODE_ISLAND, 'Rhode Island'],
  [State.SOUTH_CAROLINA, 'South Carolina'],
  [State.SOUTH_DAKOTA, 'South Dakota'],
  [State.TENNESSEE, 'Tennessee'],
  [State.TEXAS, 'Texas'],
  [State.UTAH, 'Utah'],
  [State.VERMONT, 'Vermont'],
  [State.VIRGINIA, 'Virginia'],
  [State.WASHINGTON, 'Washington'],
  [State.WASHINGTON_DC, 'Washington DC'],
  [State.WEST_VIRGINIA, 'West Virginia'],
  [State.WISCONSIN, 'Wisconsin'],
  [State.WYOMING, 'Wyoming'],
]);

export const timeMap = new Map();

for (let hour = 0; hour < 24; hour++) {
  for (const minute of [0, 30]) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';

    const key = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
      2,
      '0',
    )}`;
    const value = `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;

    timeMap.set(key, value);
  }
}
