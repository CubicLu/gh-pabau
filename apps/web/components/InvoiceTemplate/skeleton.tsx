import React, { FC } from 'react'
import { Modal, Skeleton } from 'antd'
import styles from '../../../../libs/ui/src/lib/invoice-template/InvoiceTemplate.module.less'

export const InvoiceSkeleton: FC = () => {
  return (
    <Modal
      visible={true}
      footer={null}
      centered={true}
      width={800}
      className={styles.invoiceTemplate}
    >
      <div className={styles.mainLayout}>
        <div className={styles.header}>
          <Skeleton.Button active className={styles.headerLogo} />
          <div className={styles.headerLabel}>
            <span className={styles.invoiceText}>
              <Skeleton.Input
                active
                size={'small'}
                className={styles.titleSkeleton}
              />
            </span>
            <span className={styles.headerText}>
              <Skeleton.Input
                active
                size={'small'}
                className={styles.descSkeleton}
              />
            </span>
          </div>
        </div>
        <div className={styles.mainBody}>
          <div className={styles.section1}>
            <div className={styles.left}>
              <span className={styles.fromText}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.fromSkeleton}
                />
              </span>
              <span className={styles.section1Text}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.inputSkeleton}
                />
              </span>
              <span className={styles.section1Text}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.inputSkeleton}
                />
              </span>
              <span className={styles.section1Text}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.inputSkeleton}
                />
              </span>
              <span className={styles.section1Text}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.inputSkeleton}
                />
              </span>
              <span className={styles.section1Text}>
                <Skeleton.Input
                  active
                  size={'small'}
                  className={styles.inputSkeleton}
                />
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.rightInner}>
                <div className={styles.inner}>
                  <span className={styles.headText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                </div>
                <div className={styles.inner1}>
                  <span className={styles.headText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                </div>
              </div>
              <div className={styles.rightInner}>
                <div className={styles.inner}>
                  <span className={styles.headText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                </div>
                <div className={styles.inner1}>
                  <span className={styles.headText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Skeleton.Button active className={styles.tableSkeleton} />
          <Skeleton.Button active className={styles.paymentSkeleton} />
          <div className={styles.section3}>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <div className={styles.headerText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </div>
                  <div className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.section3Inner}>
              <div className={styles.left}>
                <div className={styles.rightInner}>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.fromSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                  <div className={styles.inner}>
                    <span className={styles.headerText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.fromSkeleton}
                      />
                    </span>
                    <span className={styles.infoText}>
                      <Skeleton.Input
                        active
                        size={'small'}
                        className={styles.inputSkeleton}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.section3Links}>
                  <span className={styles.link}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.link}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.inner}>
                  <span className={styles.headerText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.inputSkeleton}
                    />
                  </span>
                  <span className={styles.infoText}>
                    <Skeleton.Input
                      active
                      size={'small'}
                      className={styles.grandTotalSkeleton}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section4}>
            <div className={styles.section4Inner}>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
              <div className={styles.inner}>
                <span className={styles.headText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
                <span className={styles.infoText}>
                  <Skeleton.Input
                    active
                    size={'small'}
                    className={styles.bankdetailSkeleton}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InvoiceSkeleton
