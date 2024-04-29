import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Form, Formik } from 'formik';
import Card from '../Card/Card';
import { alphabetics } from '../../constants/constant';
import { OnChangeValue } from 'react-select';
import Button from '../Button/Button';
import BackArrow from '../Button/BackButton';
interface ICustomTable {
  bodyData: {}[] | null | undefined;
  isLoading?: boolean;
  headerData: {}[];
  sortByAlphabeticalOrder?: {
    isApply: boolean;
    val: Array<string>;
    onCharClick: (value: string) => void;
  };
  tableHeading?: string;
  searchBeforeElements?: JSX.Element;
  searchAfterElements?: JSX.Element;
  search: boolean;
  searchText?: string;
  setSearchText?: (value: string) => void;
  dataCount: number;
  currentDataLength: number | undefined;
  limit: number;
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
  sort?: { columnName: string; sortOrder: 'ASC' | 'DESC' };
  setSort?: (value: { columnName: string; sortOrder: 'ASC' | 'DESC' }) => void;
  sortArrowVariant?: '1' | '2';
  onrowClick?: (value: number | undefined | string) => void;
  Id?: (value: number | string) => void;
  closeReasonModal?: (value: boolean) => void;
  sortAfterElements?: {
    isApply: boolean;
    option: { label: string; value: string }[];
    val: (value: string | number) => void;
    existing: any;
  };
  rowDataAccess?: boolean;
  cardClass?: string;
  CalculateparentClass?: string;
  thClass?: string;
}

interface Option {
  label: string;
  value: string | number;
}

export type IsMulti = false | true;
const CustomTable = (props: any) => {
  const [searchFieldVal, setSearchFieldVal] = useState(props.searchText ?? '');
  const nextPage = () => {
    if (Math.ceil(props.dataCount / props.limit) - 1 >= props.page) {
      props.setPage(props.page + 1);
    }
  };
  const prePage = () => {
    if (props.page <= Math.ceil(props.dataCount / props.limit) && props.page !== 1) {
      props.setPage(props.page - 1);
    }
  };

  return (
    <div>
      {' '}
      <Formik
        initialValues={{}}
        onSubmit={(values, setFieldValue) => {
        }}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            <Card
              title={props?.tableHeading ? props.tableHeading : 'Table'}
              cardStyle={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                fontFamily: 'Times New Roman, serif',
                height: '700px',
              }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', marginLeft: '930px' }}>
                  {props.searchBeforeElements && <div>{props.searchBeforeElements}</div>}

                  <div>
                    {props.search && (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                          <input
                            placeholder="Search"
                            type="text"
                            value={searchFieldVal}
                            name="search"
                            style={{
                              width: '420px',
                              display: 'flex',
                              marginLeft: '10px',
                              padding: '10px 12px',
                              border: '1px solid #5400CF',
                              borderRadius: '10PX',
                            }}
                            //   className="border h-[48px] border-solid border-GrayMid text-14px text-GrayDark py-2 px-4 pr-12 rounded-10px w-full focus:ring-2 focus:ring-offset-2 focus:ring-GrayMid transition-all duration-300 "
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === 'Enter' || e.keyCode === 13) {
                                if (props.setSearchText) {
                                  props.setPage(1);
                                  props.setSearchText(e.currentTarget.value);
                                }
                              }
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setSearchFieldVal(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <Button
                            type="button"
                            style={{
                              // margin: '-2px',
                              border: '2px solid',
                              padding: '10px 5px',
                              fontSize: '15px',
                              backgroundColor: '#5400CF',
                              width: '125px',
                              // height: '20%',
                              color: 'white',
                              borderRadius: '10px',
                            }}
                            parentStyle={{ marginLeft: '10px' }}
                            onClickHandler={() => {
                              if (props.setSearchText) {
                                props.setPage(1);
                                props.setSearchText(searchFieldVal);
                              }
                            }}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    )}
                    {/* <div>a</div>
                    <div>a</div> */}
                  </div>
                  {props.searchAfterElements && <div>{props.searchAfterElements}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                {props?.sortByAlphabeticalOrder &&
                  props?.sortByAlphabeticalOrder.isApply === true && (
                    <div style={{ display: 'flex', marginTop: '10px', width: '2%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {alphabetics?.map((char) => {
                          const isHighlighted = props.sortByAlphabeticalOrder?.val
                            ? props.sortByAlphabeticalOrder?.val.includes(char)
                            : false;

                          return (
                            <span
                              style={
                                isHighlighted
                                  ? {
                                      color: 'white',
                                      backgroundColor: '#5400CF',
                                      border: '1px solid #5400CF',
                                      borderRadius: '50%',
                                      marginTop: '4px',
                                    }
                                  : { marginTop: '3px' }
                              }
                              onClick={() => {
                                props?.sortByAlphabeticalOrder?.onCharClick(char);
                              }}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {props?.isLoading === true || props.bodyData == null ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
                    <thead>
                      <tr>
                        {props?.headerData?.map(
                          (val: { [key: string]: string | object | boolean }, index: number) => {
                            return (
                              <th
                                key={index}
                                // onClick={() => sortHandler(val)}
                                style={{
                                  border: '1px solid #dddddd',
                                  padding: '8px',
                                  textAlign: 'left',
                                }}
                              >
                                {val?.dropInplaceHeader
                                  ? (
                                      val as unknown as {
                                        [key: string]: (
                                          arg: number | string | object
                                        ) => keyof typeof val;
                                      }
                                    ).dropInplaceHeader(val)
                                  : val?.header
                                    ? `${val?.header && val?.header}`
                                    : null}
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody className="">
                      {[...Array(10)]?.map((_, loadIndex) => (
                        <tr key={`row-${loadIndex}`}>
                          {props?.headerData?.map((_: any, index: any) => {
                            return (
                              <td
                                key={index}
                                style={{
                                  border: '1px solid #dddddd',
                                  padding: '8px',
                                  textAlign: 'left',
                                }}
                              >
                                <span className={`lazy block min-h-[22px]`}></span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : props.bodyData &&
                  props.bodyData.length !== 0 &&
                  props.limit >= props.bodyData.length ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
                    <thead>
                      <tr>
                        {props?.bodyData?.length !== 0 &&
                          props?.headerData?.map(
                            (val: { [key: string]: string | object | boolean }, index: number) => {
                              return (
                                <th
                                  key={index}
                                  //   onClick={() => sortHandler(val)}
                                  style={{
                                    border: '1px solid #dddddd',
                                    padding: '8px',
                                    textAlign: 'left',
                                  }}
                                >
                                  {val?.dropInplaceHeader
                                    ? (
                                        val as unknown as {
                                          [key: string]: (
                                            arg: number | string | object
                                          ) => keyof typeof val;
                                        }
                                      ).dropInplaceHeader(val)
                                    : val?.header
                                      ? `${val?.header && val.header}`
                                      : null}
                                </th>
                              );
                            }
                          )}
                      </tr>
                    </thead>
                    <tbody>
                      {props?.bodyData?.map((row: { [key: string]: string }, rowIndex: number) => {
                        return (
                          <tr
                            key={`row-${rowIndex}`}
                            onClick={() => {
                              props.onrowClick && props.onrowClick(row._id);
                            }}
                          >
                            {props?.headerData?.map(
                              (columnCell: { [key: string]: string }, colIndex: number) => {
                                return (
                                  <td
                                    key={colIndex}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                                      if (props.closeReasonModal) {
                                        props.closeReasonModal(true);
                                      }
                                    }}
                                    style={{
                                      border: '1px solid #dddddd',
                                      padding: '8px',
                                      textAlign: 'left',
                                    }}
                                  >
                                    {columnCell.cell ? (
                                      (
                                        columnCell as unknown as {
                                          [key: string]: (
                                            arg: number | string | object
                                          ) => keyof typeof row;
                                        }
                                      ).cell(row)
                                    ) : (
                                      <div>
                                        {columnCell.name === 'id' ? (
                                          <span>Check</span>
                                        ) : row[columnCell.name] ? (
                                          row[columnCell.name].length > 25 ? (
                                            row[columnCell.name].substr(0, 25) + '...'
                                          ) : (
                                            row[columnCell.name].toString()
                                          )
                                        ) : (
                                          '-'
                                        )}
                                      </div>
                                    )}
                                  </td>
                                );
                              }
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
                    <thead>
                      <tr>
                        {props?.headerData?.map(
                          (val: { [key: string]: string | object | boolean }, index: number) => {
                            return (
                              <th
                                // onClick={() => sortHandler(val)}
                                key={index}
                              >
                                {val?.dropInplaceHeader
                                  ? (
                                      val as unknown as {
                                        [key: string]: (
                                          arg: number | string | object
                                        ) => keyof typeof val;
                                      }
                                    ).dropInplaceHeader(val)
                                  : val?.header
                                    ? `${val?.header && val.header}`
                                    : null}
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={props.headerData.length}
                          style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}
                        >
                          No Data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
              <div
                style={{
                  marginTop: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {props?.currentDataLength &&
                props?.limit >= props?.currentDataLength &&
                props?.currentDataLength !== 0 &&
                props?.limit < props?.dataCount ? (
                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {props?.page !== 1 && (
                        <span
                          onClick={() => {
                            prePage();
                          }}
                        >
                          <BackArrow style={{ rotate: '180deg', marginRight: '5px' }} />
                        </span>
                      )}
                      {props.page > 2 && props.page !== 2 && (
                        <span
                          onClick={() => {
                            props.setPage(1);
                          }}
                          style={{
                            marginLeft: '5px',
                            marginRight: '5px',
                            color: 'white',
                            backgroundColor: '#5400CF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                          }}
                        >
                          1
                        </span>
                      )}

                      {props.page > 3 && <span style={{ padding: '10px 20px' }}> . . .</span>}

                      {[props.page - 1, props.page, props.page + 1].map((p) => {
                        return (
                          p >= 1 &&
                          p <= props.totalPages && (
                            <span
                              key={p}
                              onClick={() => {
                                props.setPage(p);
                              }}
                              style={
                                props.page === p
                                  ? {
                                      marginLeft: '5px',
                                      marginRight: '5px',
                                      color: '#5400CF',
                                      backgroundColor: 'white',
                                      border: '1px solid #5400CF',
                                      borderRadius: '5px',
                                      padding: '10px 20px',
                                    }
                                  : {
                                      marginLeft: '5px',
                                      marginRight: '5px',
                                      color: 'white',
                                      backgroundColor: '#5400CF',
                                      border: 'none',
                                      borderRadius: '5px',
                                      padding: '10px 20px',
                                    }
                              }
                            >
                              {p}
                            </span>
                          )
                        );
                      })}

                      {props.totalPages > props.page + 2 && (
                        <span style={{ padding: '10px 20px' }}> . . .</span>
                      )}

                      {props.totalPages > props.page + 1 && (
                        <span
                          onClick={() => {
                            props.setPage(props.totalPages);
                          }}
                          style={{
                            marginLeft: '5px',
                            marginRight: '5px',
                            color: 'white',
                            backgroundColor: '#5400CF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                          }}
                        >
                          {props.totalPages}
                        </span>
                      )}
                      {props.page !== props.totalPages && (
                        <span
                          onClick={() => {
                            nextPage();
                          }}
                        >
                          <BackArrow style={{ marginLeft: '5px' }} />
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomTable;
