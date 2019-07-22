import styled from 'styled-components';

const ResultBox = styled.code`
  display: grid;
  ${props => (props.width && `width: ${props.width}`) || `width: 300px`};
  max-width: 80vw;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.7rem;
  color: #495057;
  ${props => props.message && `white-space: initial;`}
  :focus {
    color: #495057;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ResultBoxView = ({ result }) => {
  const value = JSON.stringify(result, null, 4);
  return (
    <pre>
      <span style={{ marginTop: '20px' }}>Results</span>
      <ResultBox message={typeof result === 'string'}>{value}</ResultBox>
    </pre>
  );
};

export default ResultBoxView;
