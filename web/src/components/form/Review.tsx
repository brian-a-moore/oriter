import { Divider, FormLabel, Grid, styled } from '@mui/material';
import { DATE_OPTIONS } from '../../config/constants';
import {
  educationLevelMap,
  incidentLocationMap,
  militaryBranchMap,
  stateMap,
  timeMap,
} from '../../config/maps';
import { MasterForm } from '../../config/types';
import { Card } from '../container';
import { Navigation } from '../navigation';
import { EmptyList, Header, SubHeader } from '../typography';

type ReviewProps = {
  activeStep: number;
  masterForm: MasterForm;
  prev: () => void;
  next: () => void;
};

export default function Review({
  activeStep,
  masterForm,
  prev,
  next,
}: ReviewProps) {
  return (
    <Grid container spacing="1rem" style={{ marginTop: '1rem' }}>
      <Card>
        <Header title="Info" />
        <Grid item xs={12} md={4}>
          <FormLabel>First Name</FormLabel>
          <p>{masterForm.info.firstName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Last Name</FormLabel>
          <p>{masterForm.info.lastName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>E-Mail</FormLabel>
          <p>{masterForm.info.email}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Funeral Home</FormLabel>
          <p>{masterForm.info.funeralHomeName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>City</FormLabel>
          <p>{masterForm.info.city}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>State</FormLabel>
          <p>{stateMap.get(masterForm.info.state)}</p>
        </Grid>
      </Card>
      <Card>
        <Header title="Bio" />
        <Grid item xs={12} md={3}>
          <FormLabel>First Name</FormLabel>
          <p>{masterForm.bio.firstName}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Middle Name</FormLabel>
          <p>{masterForm.bio.middleName}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Last Name</FormLabel>
          <p>{masterForm.bio.lastName}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Nickname</FormLabel>
          <p>{masterForm.bio.nickname}</p>
        </Grid>
        <SubHeader title="Images" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {
          <Grid container spacing="1rem">
            {masterForm.bio.images && masterForm.bio.images.length ? (
              masterForm.bio.images.map((image, index) => (
                <Grid
                  key={index}
                  item
                  xs={4}
                  sm={3}
                  md={2}
                  style={{ position: 'relative' }}>
                  <PreviewImage src={URL.createObjectURL(image)} />
                </Grid>
              ))
            ) : (
              <EmptyList text="No Images Added" />
            )}
          </Grid>
        }
        <SubHeader title="Additional Details" />
        <Grid item xs={12} md={4}>
          <FormLabel>Place of Incident</FormLabel>
          <p>{incidentLocationMap.get(masterForm.bio.placeOfIncident)}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Other</FormLabel>
          <p>{masterForm.bio.other}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Date of Birth</FormLabel>
          <p>
            {new Date(masterForm.bio.birth.date).toLocaleDateString(
              'en-US',
              DATE_OPTIONS,
            )}
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>City of Birth</FormLabel>
          <p>{masterForm.bio.birth.city}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>State of Birth</FormLabel>
          <p>{stateMap.get(masterForm.bio.birth.state)}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Date of Death</FormLabel>
          <p>
            {new Date(masterForm.bio.death.date).toLocaleDateString(
              'en-US',
              DATE_OPTIONS,
            )}
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>City of Death</FormLabel>
          <p>{masterForm.bio.death.city}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>State of Death</FormLabel>
          <p>{stateMap.get(masterForm.bio.death.state)}</p>
        </Grid>
        <SubHeader title="Parents" />
        <Grid item xs={12} md={4}>
          <FormLabel>Father's First Name</FormLabel>
          <p>{masterForm.bio.parents.father.firstName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Father's Last Name</FormLabel>
          <p>{masterForm.bio.parents.father.lastName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Father</FormLabel>
          <p>
            {masterForm.bio.parents.father.isDeceased
              ? 'Has Passed'
              : 'Is Living'}
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Mother's First Name</FormLabel>
          <p>{masterForm.bio.parents.mother.firstName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Mother's Last Name</FormLabel>
          <p>{masterForm.bio.parents.mother.lastName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Mother</FormLabel>
          <p>
            {masterForm.bio.parents.mother.isDeceased
              ? 'Has Passed'
              : 'Is Living'}
          </p>
        </Grid>
      </Card>
      <Card>
        <Header title="Education" />
        <SubHeader title="Institutions" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.education.institutions.length ? (
          masterForm.education.institutions.map(institution => (
            <Grid container spacing="1rem" key={institution.id}>
              <Grid item xs={12} md={6}>
                <FormLabel>Name</FormLabel>
                <p>{institution.name}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>City</FormLabel>
                <p>{institution.city}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>State</FormLabel>
                <p>{stateMap.get(institution.state)}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Major</FormLabel>
                <p>{institution.major}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>Degree</FormLabel>
                <p>{educationLevelMap.get(institution.degree)}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>Graduation Year</FormLabel>
                <p>{institution.name}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Institutions Added" />
        )}
        <SubHeader title="Charitable Organizations" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.education.organizations.length ? (
          masterForm.education.organizations.map(organization => (
            <Grid container spacing="1rem" key={organization.id}>
              <Grid item xs={12} md={4}>
                <FormLabel>Name</FormLabel>
                <p>{organization.name}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>Position</FormLabel>
                <p>{organization.position}</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormLabel>Years Active</FormLabel>
                <p>{organization.numOfYears}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Organizations Added" />
        )}
        <SubHeader title="Military Service" />
        <Grid item xs={12} md={3}>
          <FormLabel>Branch</FormLabel>
          <p>
            {militaryBranchMap.get(masterForm.education.militaryService.branch)}
          </p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Position</FormLabel>
          <p>{masterForm.education.militaryService.position}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Years Served</FormLabel>
          <p>{masterForm.education.militaryService.numOfYears}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Retired</FormLabel>
          <p>{masterForm.education.militaryService.isRetired ? 'Yes' : 'No'}</p>
        </Grid>
      </Card>
      <Card>
        <Header title="Family" />
        <SubHeader title="Spouse" />
        <Grid item xs={12} md={4}>
          <FormLabel>First Name</FormLabel>
          <p>{masterForm.family.spouse.firstName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Last Name</FormLabel>
          <p>{masterForm.family.spouse.lastName}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Years Together</FormLabel>
          <p>{masterForm.family.spouse.numOfYears}</p>
        </Grid>
        <SubHeader title="Children" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.family.children.length ? (
          masterForm.family.children.map(child => (
            <Grid container spacing="rem" key={child.id}>
              <Grid item xs={12} md={6}>
                <FormLabel>First Name</FormLabel>
                <p>{child.firstName}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Last Name</FormLabel>
                <p>{child.lastName}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Spouse Name</FormLabel>
                <p>{child.spouseName}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>City</FormLabel>
                <p>{child.city}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>State</FormLabel>
                <p>{stateMap.get(child.state)}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Child</FormLabel>
                <p>{child.isDeceased ? 'Has Passed' : 'Is Living'}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Children Added" />
        )}
        <SubHeader title="Siblings" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.family.siblings.length ? (
          masterForm.family.siblings.map(sibling => (
            <Grid container spacing="rem" key={sibling.id}>
              <Grid item xs={12} md={6}>
                <FormLabel>First Name</FormLabel>
                <p>{sibling.firstName}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Last Name</FormLabel>
                <p>{sibling.lastName}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Spouse Name</FormLabel>
                <p>{sibling.spouseName}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>City</FormLabel>
                <p>{sibling.city}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>State</FormLabel>
                <p>{stateMap.get(sibling.state)}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>Sibling</FormLabel>
                <p>{sibling.isDeceased ? 'Has Passed' : 'Is Living'}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Siblings Added" />
        )}
        <SubHeader title="Close Friends" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.family.friends.length ? (
          masterForm.family.friends.map(friend => (
            <Grid container spacing="rem" key={friend.id}>
              <Grid item xs={12} md={6}>
                <FormLabel>First Name</FormLabel>
                <p>{friend.firstName}</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Last Name</FormLabel>
                <p>{friend.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Friends Added" />
        )}
      </Card>
      <Card>
        <Header title="Employment" />
        <SubHeader title="Employers" />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {masterForm.employment.employers.length ? (
          masterForm.employment.employers.map(employer => (
            <Grid container spacing="1rem" key={employer.id}>
              <Grid item xs={12} md={3}>
                <FormLabel>Name</FormLabel>
                <p>{employer.name}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>City</FormLabel>
                <p>{employer.city}</p>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormLabel>State</FormLabel>
                <p>{stateMap.get(employer.state)}</p>
              </Grid>
              <Grid item xs={12} md={1.5}>
                <FormLabel>Years Worked</FormLabel>
                <p>{employer.numOfYears}</p>
              </Grid>
              <Grid item xs={12} md={1.5}>
                <FormLabel>Retired</FormLabel>
                <p>{employer.isRetired ? 'Yes' : 'No'}</p>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyList text="No Employers Added" />
        )}
        <SubHeader title="Final Thoughts" />
        <Grid item xs={12} md={6}>
          <FormLabel>Hobbies</FormLabel>
          <p>{masterForm.employment.hobbies}</p>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel>Additional Info</FormLabel>
          <p>{masterForm.employment.additionalInfo}</p>
        </Grid>
      </Card>
      <Card>
        <Header title="Service" />
        <Grid item xs={12} md={4}>
          <FormLabel>Church/Funeral Home</FormLabel>
          <p>{masterForm.service.service.name}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>City</FormLabel>
          <p>{masterForm.service.service.city}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>State</FormLabel>
          <p>{stateMap.get(masterForm.service.service.state)}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormLabel>Minister's Name</FormLabel>
          <p>{masterForm.service.service.ministerName}</p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Date of Service</FormLabel>
          <p>
            {new Date(masterForm.service.service.date).toLocaleDateString(
              'en-US',
              DATE_OPTIONS,
            )}
          </p>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormLabel>Time of Service</FormLabel>
          <p>{timeMap.get(masterForm.service.service.time)}</p>
        </Grid>
        <SubHeader title="Viewing" />
        <Grid item xs={12} md={4}>
          <FormLabel>Church/Funeral Home</FormLabel>
          <p>{masterForm.service.viewing.name}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>City</FormLabel>
          <p>{masterForm.service.viewing.city}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>State</FormLabel>
          <p>{stateMap.get(masterForm.service.viewing.state)}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>Start Time</FormLabel>
          <p>{timeMap.get(masterForm.service.viewing.startTime)}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>End Time</FormLabel>
          <p>{timeMap.get(masterForm.service.viewing.endTime)}</p>
        </Grid>
        <SubHeader title="Repass" />
        <Grid item xs={12} md={4}>
          <FormLabel>Repass Location Name</FormLabel>
          <p>{masterForm.service.repass.name}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>City</FormLabel>
          <p>{masterForm.service.repass.city}</p>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormLabel>State</FormLabel>
          <p>{stateMap.get(masterForm.service.repass.state)}</p>
        </Grid>
      </Card>
      <Navigation
        activeStep={activeStep}
        prev={prev}
        next={next}
        disabled={false}
      />
    </Grid>
  );
}
const PreviewImage = styled('img')({
  width: '100%',
  objectFit: 'contain',
});
