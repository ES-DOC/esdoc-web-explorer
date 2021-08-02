## Layout of cmip6 model comparator data file is as follows:

- nodes:
    - 3 member tuple:
        (node-type, node-idx, node-key)

    - node-types:
        0 - institute-id
        1 - source-id
        2 - topic-id
        3 - specialisation-id
        4 - value-id

- edges:
    - 5 member tuple:
        (institute-idx, source-idx, topic-idx, specialisation-idx, value-idx)
