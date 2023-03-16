const ENV = 'development'

export default (
  ENV === 'development' ? 'localhost':
    'ec2-54-244-59-69.us-west-2.compute.amazonaws.com'
)