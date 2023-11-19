const contractAddress = '0x508031919A1295058bbbEBD4e2156F4096703CFc';

const goerliABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_projectid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_plotid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_latitude',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_longitude',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_auditid',
        type: 'string',
      },
    ],
    name: 'addField',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'nameofperson',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'peoples',
    outputs: [
      {
        internalType: 'string',
        name: 'projectid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'plotid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'latitude',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'longitude',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'auditid',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'projectid',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'plotid',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'latitude',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'longitude',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'auditid',
            type: 'string',
          },
        ],
        internalType: 'struct FormInput.Person[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
export default {
  contractAddress,
  goerliABI,
};
